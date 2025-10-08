package Eventverwaltung.Teilnehmer.entity;

//import Eventverwaltung.Teilnehmer.entity.internal.UserEvent;

public class UserEventTO {

    private String userEmail;
    private int eventId;
    private int radio;

    public UserEventTO() {}

    public UserEventTO(String userEmail, int eventId, int radio) {
        this.userEmail = userEmail;
        this.eventId = eventId;
        this.radio = radio;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getEventId() {
        return eventId;
    }

    public int getRadio() {
        return radio;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public void setRadio(int radio) {
        this.radio = radio;
    }
}
