package Eventverwaltung.Security;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/users")
public class UserResource {

    /*
    TODO - changed idea of making users get Admin rights when creating a new event to getting the rights trough login.
    pathparam queryparam is no longer needed, clean up and remove
     */

    @GET
    @RolesAllowed({"admin","user"})
    @Produces(MediaType.APPLICATION_JSON)
    public String userResource(@Context SecurityContext securityContext) {
        if (!Permissions.check(securityContext, 1)){ //TODO pathparam queryparam
            return "Access denied!";
        }
        //securityContext.isUserInRole("wichtel1");
        return securityContext.getUserPrincipal().getName();
    }
}

