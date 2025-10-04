package Eventverwaltung.Teilnehmer.entity.internal;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserEventId implements Serializable {

    @Column(name = "usermail")
    private String UserEmail;

    @Column(name = "event_eventid")
    private Long eventId;

    public UserEventId() {}

    public UserEventId(String userEmail, Long eventId) {
        this.UserEmail = userEmail;
        this.eventId = eventId;
    }

    public String getUserEmail() {
        return UserEmail;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setUserEmail(String userEmail) {
        this.UserEmail = userEmail;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserEventId)) return false;
        UserEventId that = (UserEventId) o;
        return Objects.equals(UserEmail, that.UserEmail) &&
                Objects.equals(eventId, that.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(UserEmail, eventId);
    }
}
