package Eventverwaltung.Teilnehmer.dao;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Map;

/*
Abstract class for functions such as:
save, update, delete, find, findAll (list), findOneResult, findListResult
Note: DAO = Data Access Object, a layer to handle all data operations cleanly
 */
public abstract class GenericDAO<T> {

//    private final String UNIT_NAME = "Wichtel_AppCtr_EJB";

//    @PersistenceContext(unitName = UNIT_NAME)

    protected EntityManager em;

    private Class<T> entityClass;

    public GenericDAO() {}

    public GenericDAO(EntityManager em, Class<T> entityClass) {
        this.em = em;
        this.entityClass = entityClass;
    }

    public boolean save(T entity) {
        try {
            this.em.persist(entity);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean update(T entity) {
        try {
            this.em.merge(entity);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(Object id, Class<T> classe){
        T entityToBeRemoved = em.getReference(classe, id);
        try {
            em.remove(entityToBeRemoved);
            return true;
        } catch (Exception e) {
            System.out.println("Fehler beim Speichern der ID: "+ id.toString());
            return false;
        }
    }

    public T find(int entityId) {
        return em.find(entityClass, entityId);
    }



    public List<T> findAll() {
        CriteriaQuery<T> cq = em.getCriteriaBuilder().createQuery(entityClass);
        cq.select(cq.from(entityClass));
        return em.createQuery(cq).getResultList();
    }


    protected T findOneResult (String namedQuery, Map<String, Object> parameters) {
        T result = null;
        try {
            TypedQuery<T> query = em.createNamedQuery(namedQuery,entityClass);
            if(parameters != null && !parameters.isEmpty()){
                populateQueryParameters(query, parameters);
            }

            result = query.getSingleResult();
        } catch (Exception e) {
            System.out.println("Fehler bei der Query: " + e.getMessage());
            e.printStackTrace();
        }
        return result;
    }


    protected List<T> findListResult(String namedQuery, Map<String, Object> parameters) {
        List<T> result = null;
        try{
            TypedQuery<T> query = em.createNamedQuery(namedQuery,entityClass);
            if (parameters != null && !parameters.isEmpty()) {
                populateQueryParameters(query, parameters);
            }
            result = query.getResultList();
        } catch (Exception e) {
            System.out.println("Fehler bei der Query: " + e.getMessage());
        }
        return result;
    }



    private void populateQueryParameters(Query query, Map<String, Object> parameters) {
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
    }
}
