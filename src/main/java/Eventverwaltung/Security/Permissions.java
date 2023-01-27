package Eventverwaltung.Security;

import javax.ws.rs.core.SecurityContext;

public class Permissions {

    public static boolean check(SecurityContext securityContext, int eventId) {
        return securityContext.isUserInRole("ADMIN") || securityContext.isUserInRole("Event" + eventId);
    }
}
