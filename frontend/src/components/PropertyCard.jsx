const PropertyCard = ({ prop }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="h-56 w-full bg-gray-100">
        <img
          src={prop.mainImage || "/placeholder.png"}
          alt={prop.title}
          className="w-full h-56 object-cover"
          draggable="false"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{prop.title}</h3>
          <span className="text-sm text-gray-500">{prop.location}</span>
        </div>

        <p className="mt-2 text-indigo-600 font-bold text-xl">
          ₹ {typeof prop.price === "number" ? prop.price.toLocaleString() : prop.price}
        </p>

        <p className="mt-3 text-sm text-gray-600 line-clamp-2">{prop.description || "No description"}</p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Builder: {prop.builderName || "—"}</span>
          <span>{new Date(prop.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;