package Eventverwaltung.Event.entity.internal;

import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "wichtel_subgruppe")
public class Subgruppe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "grupseq")
    private int subgruppeId;
    private String subgruppeName;


    @JoinColumn(name = "event_ID",referencedColumnName = "EventId", nullable = false, table = "wichtel_event")
    private int eventID;

    @ManyToMany(targetEntity = User.class, fetch = FetchType.EAGER)
    private Set<User> users = new HashSet<>();

    public Subgruppe() {

    }
    public Subgruppe(int id,String name,int eventID) {
        this.subgruppeId = id;
        this.eventID = eventID;
        this.subgruppeName = name;
    }

    public SubgruppeTO toSubgruppeTO(){
        SubgruppeTO subTO= new SubgruppeTO(this.subgruppeId,this.subgruppeName,this.eventID);
        return subTO;
    }

    public int getSubgruppeId() {
        return subgruppeId;
    }

    public void setSubgruppeId(int subgruppeId) {
        this.subgruppeId = subgruppeId;
    }

    public String getSubgruppeName() {
        return subgruppeName;
    }

    public void setSubgruppeName(String subgruppeName) {
        this.subgruppeName = subgruppeName;
    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int event) {
        this.eventID = event;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
