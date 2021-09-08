import { LocationMarkerIcon, UserIcon, CalendarIcon } from '@heroicons/react/outline';
import { shortDate, shortTime } from '../../utilities/format';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import CompanyLogoPlaceholder from '../../assets/images/companyLogoPlaceholder.png';

const OutcomeActivity = ({ activity }) => {
  return (
    <div className="shadow rounded grid grid-cols-2 gap-5 mb-5">
      <div className="flex justify-between flex-1 p-5">
        <div className="">
          <div className="flex space-x-5">
            <Link to={`/entities/${activity.company.id}`} className="flex-shrink-0">
              <img
                className="h-14 w-14 rounded-full"
                src={activity.company.logo ? activity.company.logo : CompanyLogoPlaceholder}
                alt={activity.company.name}
              />
            </Link>
            <h3 className="font-medium text-gray-900">{activity.name}</h3>
          </div>

          <div className="flex justify-between mt-3 text-gray-500 text-sm">
            <span>
              <p>
                <UserIcon className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400 inline-block" aria-hidden="true" />
                <Link to={`/profiles/${activity.user.id}`} className="text-indigo-500 hover:text-indigo-700 mx-1">
                  {activity.user.name}
                </Link>
                of
                <Link to={`/entities/${activity.company.id}`} className="text-indigo-500 hover:text-indigo-700 mx-1">
                  {activity.company.name}
                </Link>
              </p>
            </span>
            <p>
              <LocationMarkerIcon className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400 inline-block" aria-hidden="true" />
              {activity.place?.name ?? ''}
            </p>
            <p>
              <CalendarIcon className="flex-shrink-0 mr-1 h-4 w-4 text-gray-400 inline-block" aria-hidden="true" />
              {shortDate(new Date(activity.createdAt))} at {shortTime(new Date(activity.createdAt))}
            </p>
          </div>
          <p className="border p-5 m-3 rounded-sm bg-gray-50">{activity.description}</p>

          <div className="text-right">
            <Link
              to={activity.link}
              className="relative inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
            >
              See More
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAFFq4EXZl9GzzCt1ceMRlEhc0hH9rFH-g' }}
          defaultCenter={{
            lat: parseFloat(activity.place?.geoPosition?.split(',')[0]),
            lng: parseFloat(activity.place?.geoPosition?.split(',')[1]),
          }}
          defaultZoom={parseInt(activity.place?.geoPosition?.split(',')[2])}
          yesIWantToUseGoogleMapApiInternals
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default OutcomeActivity;
