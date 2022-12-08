package Eventverwaltung.Event.entity.internal;

import Eventverwaltung.Event.entity.SubgruppeTO;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "wichtel_subgruppe")
public class Subgruppe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int subgruppeId;
    private String subgruppeName;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
    private Event event;

    public Subgruppe() {

    }
    public Subgruppe(int id,String name,Event event) {
        this.subgruppeId = id;
        this.event = event;
        this.subgruppeName = name;
    }

    public SubgruppeTO toSubgruppeTO(){
        SubgruppeTO subTO= new SubgruppeTO(this.subgruppeId,this.subgruppeName,this.event);
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

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
