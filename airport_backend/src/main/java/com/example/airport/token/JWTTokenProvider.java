package com.example.airport.token;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.airport.auth.PermissionCollector;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.example.airport.auth.JwtAuthorizationFilter.TOKEN_PREFIX;
import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
public class JWTTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    private UserDetailsService userDetailsService;

    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    private static final String ISSUER = "Issuer";
    private static final String AUDIENCE = "Skypass airport management webservice";
    public static final String AUTHORITIES = "authorities";
    public static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 5;

    public String generateJwtToken(PermissionCollector permissionCollector) {
        String[] claims = getClaimsFromUser(permissionCollector);
        return JWT.create()
                .withIssuer(ISSUER)
                .withAudience(AUDIENCE)
                .withIssuedAt(new Date())
                .withSubject(permissionCollector.getUsername())
                .withClaim("role", permissionCollector.getUser().getRole().name())
                .withArrayClaim(AUTHORITIES, claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(secret.getBytes()));
    }


    public List<GrantedAuthority> getAuthorities(String token) {
        String[] claims = getClaimsFromToken(token);
        return stream(claims).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    public Authentication getAuthentication(String username, List<GrantedAuthority> authorities, HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION).substring(TOKEN_PREFIX.length());
        String role = JWT.decode(token).getClaim("role").asString();
        List<String> permissionList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        PermissionCollector permissionCollector = new PermissionCollector(username, role, permissionList);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(permissionCollector, null, authorities);
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authToken;
    }

    public boolean isTokenValid(String username, String token) {
        JWTVerifier verifier = getJWTVerifier();
        return StringUtils.isNotEmpty(username) && !isTokenExpired(verifier, token);
    }

    public String getSubject(String token) {
        JWTVerifier verifier = getJWTVerifier();
        return verifier.verify(token).getSubject();
    }

    private boolean isTokenExpired(JWTVerifier verifier, String token) {
        Date expirationDate = verifier.verify(token).getExpiresAt();
        return expirationDate.before(new Date());
    }

    private String[] getClaimsFromToken(String token) {
        JWTVerifier verifier = getJWTVerifier();
        return verifier.verify(token).getClaim(AUTHORITIES).asArray(String.class);
    }

    private JWTVerifier getJWTVerifier() {
        JWTVerifier verifier;
        try {
            Algorithm algorithm = HMAC512(secret);
            verifier = JWT.require(algorithm).withIssuer(ISSUER).build();
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException(TOKEN_CANNOT_BE_VERIFIED);
        }
        return verifier;
    }

    private String[] getClaimsFromUser(PermissionCollector permissionCollector) {
        List<String> authorities = new ArrayList<>();
        Collection<? extends GrantedAuthority> userAuthorities = permissionCollector.getAuthorities();
        if (userAuthorities == null || userAuthorities.isEmpty()) {
            throw new IllegalStateException("No authorities found for user: " + permissionCollector.getUsername());
        }
        for (GrantedAuthority authority : userAuthorities) {
            authorities.add(authority.getAuthority());
        }
        return authorities.toArray(new String[0]);
    }
}