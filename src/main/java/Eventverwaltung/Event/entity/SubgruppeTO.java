
package Eventverwaltung.Event.entity;

import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.entity.internal.Subgruppe;

import java.io.Serializable;

public class SubgruppeTO implements Serializable {

    private int subgruppeId;
    private String subgruppeName;
    private Event event;

    public SubgruppeTO(int subgruppeId, String subgruppeName, Event event) {
        this.subgruppeId = subgruppeId;
        this.subgruppeName = subgruppeName;
        this.event = event;
    }

    public Subgruppe toSubgruppe(){
        Subgruppe subgruppe= new Subgruppe(this.subgruppeId,this.subgruppeName,this.event);
        return subgruppe;
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
