import { useContext } from "react";
import Card from '../ui/Card'
import classes from './MeetupItem.module.css';
import FavoritesContext from "../../store/favorites-context";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
        favoritesCtx.removeFavorite(props.id);
    } else {
        favoritesCtx.addFavorite({
            ...props
        });
    }
  }
  return (
    <Card>
        <li className={classes.item}>
        <div className={classes.image}>
            <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
            <h3>{props.title}</h3>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
            <button onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}</button>
        </div>
        </li>
    </Card>
  );
}

export default MeetupItem;
