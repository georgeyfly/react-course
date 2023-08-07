import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadMeetups, setLoadMeetups] = useState([]);

  useEffect(() => {
      fetch(
        "https://react-test-555e1-default-rtdb.firebaseio.com/meetups.json"
      ).then(response => {
        return response.json();
      }).then(data => {
        const meetups = [];

        for (const key in data) {
            const meetup = {
                id: key,
                ...data[key]
            };

            meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadMeetups(meetups);
      });
  }, []);

  if (isLoading){
    return (
        <section>
            <p>Loading...</p>
        </section>
    );
  }

  return <section>
    <h1>All meetups Page</h1>
    <MeetupList meetups={loadMeetups} />
  </section>;
}

export default AllMeetupsPage;
