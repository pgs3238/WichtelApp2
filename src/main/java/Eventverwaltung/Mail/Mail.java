package Eventverwaltung.Mail;

import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("/mail")
public class Mail {

    @Inject
    Mailer mailer;

    @Path("/einladen")
    @GET
    @Blocking
    public void sendEmail(){
        mailer.send(io.quarkus.mailer.Mail.withText("email@email.de",  //TODO inject email Address to send to
                "Sie wurden zu einem Secret Santa Event eingeladen",
                "Folgen Sie dem Link, um an dem Event Teilzunehmen."));
       /* mailer.send(
                Mail.withText("email@email.de",
                        "Sie wurden zu einem Secret Santa Event eingeladen",
                        "Folgen Sie dem Link, um an dem Event Teilzunehmen."

                )
        );*/
    }
    @Path("/frage")
    @GET
    @Blocking
    public void sendEmailToAdmin(){
        mailer.send(io.quarkus.mailer.Mail.withText("email@email.de",  //TODO inject email Address to send to
                "Ein Nutzer moechte eine Frage stellen",
                "Hallo ich habe ein Problem mit... "));//TODO inject email Body from Webpage
       /* mailer.send(
                Mail.withText("email@email.de",
                        "Sie wurden zu einem Secret Santa Event eingeladen",
                        "Folgen Sie dem Link, um an dem Event Teilzunehmen."

                )
        );*/
    }


}
