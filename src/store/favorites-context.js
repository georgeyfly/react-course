// You've defined a context to manage a user's favorite meetups.
// There's a provider component (FavoritesContextProvider) that will wrap parts of the app that need access to this favorites data.
// The provider component manages the favorites in its local state and provides functions to add to, remove from, and check items in this favorites list.
// Any child component wrapped by this provider can access the favorites data and functions using the useContext hook.
import { createContext, useState } from 'react';

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: favoriteMeetup => {},
    removeFavorite: meetupId => {},
    itemIsFavorite: meetupId => {}
});

export function FavoritesContextProvider(props) {
    
    const [userFavorites, setUserFavorites] = useState([]);

    function addFavoriteHandler(favoriteMeetup) {
      setUserFavorites((prevUserFavorites) => {
        return prevUserFavorites.concat(favoriteMeetup);
      });
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorites((prevUserFavorites) => {
          return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
        });
    }

    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId)
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    };

    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;