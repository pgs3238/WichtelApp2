package Eventverwaltung.Security;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

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
