package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.EventDAO;
import Eventverwaltung.Event.dao.User_EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.Event;
import Eventverwaltung.Event.entity.internal.User_Event;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.entity.internal.User;
import Eventverwaltung.Teilnehmer.usecase.IWichtelzuordnung;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.*;
import java.util.stream.Collectors;
@Path("/wichteln")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class Wichtelzuordnung implements IWichtelzuordnung{

    @Inject
    User_EventDAO user_eventDAO;

    @Inject
    EventDAO eventDAO;

    private static class WeightedPair implements Comparable<WeightedPair> {
        private final String user1;
        private final String user2;
        private int weight;

        public WeightedPair(String user1, String user2) {
            this.user1 = user1;
            this.user2 = user2;
        }

        public String getUser1() {
            return user1;
        }

        public String getUser2() {
            return user2;
        }

        public int getWeight() {
            return weight;
        }

        public void setWeight(int weight) {
            this.weight = weight;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            WeightedPair that = (WeightedPair) o;
            return user1.equals(that.user1) && user2.equals(that.user2);
        }

        @Override
        public int hashCode() {
            return Objects.hash(user1, user2);
        }

        @Override
        public String toString() {
            return "WeightedPair{" +
                    "user1='" + user1 + '\'' +
                    ", user2='" + user2 + '\'' +
                    ", weight=" + weight +
                    '}';
        }

        @Override
        public int compareTo(WeightedPair o) {
            return Integer.compare(weight, o.weight);
        }

    }

    @POST
    @RolesAllowed({"admin", "owner"})
    @Override
    public Map<String, String> WichtelLosen(@QueryParam("eventID") int eventID) {
        Event event = eventDAO.find(eventID);
        Set<String> users = event.getUser().stream().map(User::getEmail).collect(Collectors.toSet());
        List<List<String>> userGroups = event.getSubgruppen().stream().map(sub -> sub.getUser().stream().map(User::getEmail).toList()).toList();
        System.out.println(userGroups.stream().map(List::size).toList());

        List<WeightedPair> pairs = new ArrayList<>();
        // Annahme: Jeder Nutzer kann jeden beschenken
        for (String user1 : users) {
            for (String user2 : users) {
                // if beschränkt das user nicht selber beschenken kann
                if (user1.equals(user2)) {
                    continue;
                }

                WeightedPair pair = new WeightedPair(user1, user2);
                pairs.add(pair);
            }
        }

        // Einschränkung: Jeder Nutzer kann nicht Personen aus Subgruppen beschenken
        for (List<String> userGroup : userGroups) {
            for (String user1 : userGroup) {
                for (String user2 : userGroup) {
                    if (user1.equals(user2)) {
                        continue;
                    }

                    WeightedPair pair = new WeightedPair(user1, user2);
                    pairs.remove(pair);
                }
            }
        }

        for (String user : users) {
            // Zählen aller möglichen Paare pro Nutzer
            int count = 0;
            for (WeightedPair pair : pairs) {
                if (pair.getUser1().equals(user) || pair.getUser2().equals(user)) {
                    count++;
                }
            }

            // Setzen des Gewichts pro Nutzer
            for (WeightedPair pair : pairs) {
                if (pair.getUser2().equals(user)) {
                    pair.setWeight(pair.getWeight() + count);
                }
            }
        }

        // Verbindungen mischen
        Collections.shuffle(pairs);
        // Verbindungen sortieren nach Gewichtung (bleibt teils gemischt da Gewichtung gleich)
        Collections.sort(pairs);

        // Partner finden
        Map<String, String> partners = new HashMap<>();
        while (!pairs.isEmpty()) {
            WeightedPair pair = pairs.get(0);
            pairs.remove(0);

            if (partners.containsKey(pair.getUser1())) {
                continue;
            }

            partners.put(pair.getUser1(), pair.getUser2());

            Set<WeightedPair> toBeRemoved = new HashSet<>();
            for (WeightedPair p : pairs) {
                if (p.getUser2().equals(pair.getUser2())) {
                    toBeRemoved.add(p);
                }
            }
            pairs.removeAll(toBeRemoved);
        }
        event.setPartner(partners);
        eventDAO.update(event);
        return partners;
    }

    /*@Override
    public Map<String, String> WichtelLosen(int eventID) {
        Event event = eventDAO.find(eventID);
        Set<String> users = new HashSet<>();

        users.add(event.getOwner());
        users.addAll(event.getUser().stream().map(User::getEmail).toList());

        //prüft ob das Event schon durchgelost wurde
        if (istSchonDurchgelost(teilnehmerByEvent)) {
            return null;
        }

        //prüft ob die Subgruppen alle unter 50% der Teilnehmer haben
        if (!kleineSubgruppen(event)) {
            return null;
        }

        //prüft ob sich mehr als eine Person in dem Event befinden
        if (teilnehmerByEvent.size() == 1) {
            return null;
        }







    }*/

    @Override
    public Map<UserTO,UserTO> WichtelZulosen(EventTO event) {
        Collection<User_Event> teilnehmerByEvent = user_eventDAO.findUserEventByEvent(event);
        Collection<User_Event> wichtelListe = user_eventDAO.findUserEventByEvent(event);
        Map<UserTO, UserTO> zuordnung = new HashMap<>();

        //prüft ob das Event schon durchgelost wurde
        if (istSchonDurchgelost(teilnehmerByEvent)) {
            return null;
        }

        //prüft ob die Subgruppen alle unter 50% der Teilnehmer haben
        if (!kleineSubgruppen(event)) {
            return null;
        }

        //prüft ob sich mehr als eine Person in dem Event befinden
        if (teilnehmerByEvent.size() == 1) {
            return null;
        }

        for (User_Event ue : teilnehmerByEvent) {
            boolean weiter = false;

            do {
                Optional<User_Event> neuWichtel = wichtelListe.stream().skip(new Random()
                        .nextInt(wichtelListe.size())).findFirst();
                if (!neuWichtel.get().equals(ue) || !neuWichtel.get().getSubgruppe().equals(ue.getSubgruppe())) {
              //      zuordnung.put(ue.getUser(), neuWichtel.get().getUser());
                    wichtelListe.remove(neuWichtel);
                    ue.setWichtel(neuWichtel.get().getUser());
                    user_eventDAO.save(ue);
                    weiter = true;
                } else weiter = false;

            } while (weiter = false);

        }
        return zuordnung;
    }

    // sortiert die User nach der Größe der Subgruppe
    // das ist benötigt damit man in der Zuordnung nicht in eine Endlosschleife läuft
    public Collection<User_Event> UserEventSortieren(Collection<User_Event> collection){
        return null;
    }

    //prüft ob jeder Teilnehmer schon ein Wichtel hat (evtl. benachrichtigen oder keine neue Zuordnung)
    public boolean istSchonDurchgelost(Collection<User_Event> liste){
        for (User_Event ue : liste){
            if (ue.getWichtel()!= null){
                continue;
            }else return false;
        }
        return true;
    }

    //prüft ob keine der Subgruppen mehr als 50% der Teilnehmer hat
    public boolean kleineSubgruppen(EventTO event){
        Collection<User_Event> subgrListe = user_eventDAO.getSubgruppeNachGroesse(event);
        Collection<User_Event> alleTeilnehmer = user_eventDAO.findUserEventByEvent(event);

        //ermittelt die gesamtgroesse an Teilnehmern des Events
        int gesamtgroesse =0;
        for(User_Event ue : alleTeilnehmer){
                gesamtgroesse++;
        }

        //vergleicht ob jeder Wert aus dem SubgruppenCount größer als 50% ist
        for(User_Event ue : subgrListe){
            int wert = Integer.parseInt(subgrListe.toString());
            if (wert > gesamtgroesse*0.5){
                return false;
            }else continue;
        }
     return true;
    }
}
