import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import GoogleMapReact from 'google-map-react';

const Feed = () => {
  const { data: activities } = useQuery('activities', activitiesQuery, {
    keepPreviousData: true,
  });

  if (!activities) return <></>;

  return (
    <>
      {activities.map(activity => (
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg m-4">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-4 flex justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={activity.company.logo}
                    alt={activity.company.name}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{activity.name}</h3>
                  <p className="text-sm text-gray-500">
                    <a href="#">{activity.event} - {activity.place.name} - {activity.place.createdAt}</a>
                  </p>
                  {activity.company.description}
                  <div className="my-4 flex flex-wrap content-end">
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span>See More</span>
                    </button>
                  </div>

                </div>
                
              </div>  

            </div>
            <div className="ml-4 mt-4 h-60 w-96">
              {console.log(activity.place?.geoPosition?.split(',')[2])}
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAFFq4EXZl9GzzCt1ceMRlEhc0hH9rFH-g' }}
                defaultCenter={{ lat: parseFloat(activity.place?.geoPosition?.split(',')[0]), lng: parseFloat(activity.place?.geoPosition?.split(',')[1]) }}
                defaultZoom={parseInt(activity.place?.geoPosition?.split(',')[2])}
                yesIWantToUseGoogleMapApiInternals
              ></GoogleMapReact>
            </div>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0 flex justify-end">

          </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
