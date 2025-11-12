import { Link } from "react-router-dom";

export const ArtCard = ({ artwork }) => {
  const { image, title, category, description, _id } = artwork;
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="p-4 rounded-xl w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="badge text-xs badge-xs badge-secondary rounded-full">
          {category}
        </div>
        <p className="line-clamp-1">{description}</p>
        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60">
            {/* <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views}
            </span> */}
            {/* <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </span> */}
          </div>
          <Link
            to={`/artwork/${artwork._id}`}
            className="btn rounded-full bg-linear-to-r from-sky-500 to-red-600 hover:from-red-600 hover:to-sky-500 text-white w-full btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
