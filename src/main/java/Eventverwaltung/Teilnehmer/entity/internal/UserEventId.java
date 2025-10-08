package Eventverwaltung.Teilnehmer.entity.internal;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserEventId implements Serializable {

    @Column(name = "usermail")
    private String userEmail;

    @Column(name = "event_eventid")
    private int eventId;

    public UserEventId() {}

    public UserEventId(String userEmail, int eventId) {
        this.userEmail = userEmail;
        this.eventId = eventId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public int getEventId() {
        return eventId;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEventId)) return false;
        UserEventId that = (UserEventId) o;
        return Objects.equals(userEmail, that.userEmail) &&
                Objects.equals(eventId, that.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userEmail, eventId);
    }
}
