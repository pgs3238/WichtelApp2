
package Eventverwaltung.Event.entity;

import Eventverwaltung.Event.entity.internal.Subgruppe;

import java.io.Serializable;

public class SubgruppeTO implements Serializable {

    private int subgruppeId;
    private String subgruppeName;
    private int eventID;

    public SubgruppeTO(int subgruppeId, String subgruppeName, int eventID) {
        this.subgruppeId = subgruppeId;
        this.subgruppeName = subgruppeName;
        this.eventID = eventID;
    }

    public Subgruppe toSubgruppe(){
        Subgruppe subgruppe= new Subgruppe(this.subgruppeId,this.subgruppeName,this.eventID);
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

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }
}
