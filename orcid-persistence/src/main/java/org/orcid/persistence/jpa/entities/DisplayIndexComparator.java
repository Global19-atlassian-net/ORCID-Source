package org.orcid.persistence.jpa.entities;

import java.io.Serializable;
import java.util.Comparator;

/**
 * 
 * Comparator that compares OrcidEntity objects based on their ID.
 * 
 * @author rcpeters
 * 
 */
public class DisplayIndexComparator<T> implements Comparator<DisplayIndexInterface>, Serializable {

    private static final long serialVersionUID = 1L;
    @Override
    public int compare(DisplayIndexInterface o1, DisplayIndexInterface o2) {
        Long index = o1.getDisplayIndex();
        Long otherIndex = o2.getDisplayIndex();
        if (index == null) {
            if (otherIndex == null) {
                return 0;
            } else {
                return -1;
            }
        } else {
            if (otherIndex == null) {
                return 1;
            } else if (index instanceof Comparable) {
                return  index.compareTo(otherIndex);
            } else {
                return 0;
            }
        }
    }

}
