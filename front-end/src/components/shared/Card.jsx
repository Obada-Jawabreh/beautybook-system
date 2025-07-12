import React from "react";
import { Users, DollarSign, Trash2, Edit, Mail, Calendar } from "lucide-react";

export default function Card({
  data,
  keys = {},
  showEditIcon = true,
  showDeleteIcon = true,
  showStaffInfo = true,
  showPrice = true,
  showDescription = true,
  showEmail = false,
  showJoinDate = false,
  showSpecialties = false,
  showAvatar = false,
  staffCardMode = false,
  onEdit,
  onDelete,
  onClick,
  className = "",
  titleClassName = "",
  priceClassName = "",
  descriptionClassName = "",
  editIcon: EditIcon = Edit,
  deleteIcon: DeleteIcon = Trash2,
  priceIcon: PriceIcon = DollarSign,
  staffIcon: StaffIcon = Users,
  emailIcon: EmailIcon = Mail,
  calendarIcon: CalendarIcon = Calendar,
  editTooltip = "Edit",
  deleteTooltip = "Delete",
  disabled = false,
  loading = false,
}) {
  const mergedKeys = {
    title: "name",
    staff: "staff_count",
    price: "price",
    description: "description",
    id: "id",
    email: "email",
    firstName: "first_name",
    lastName: "last_name",
    avatar: "avatar",
    createdAt: "createdAt",
    specialties: "specialties",
    ...keys,
  };

  const title = staffCardMode
    ? `${data?.[mergedKeys.firstName]} ${data?.[mergedKeys.lastName]}`
    : typeof mergedKeys.title === "function"
    ? mergedKeys.title(data)
    : data?.[mergedKeys.title];

  const staff = data?.[mergedKeys.staff];
  const price = data?.[mergedKeys.price];
  const description =
    typeof mergedKeys.description === "function"
      ? mergedKeys.description(data)
      : data?.[mergedKeys.description];
  const email = data?.[mergedKeys.email];
  const id = data?.[mergedKeys.id];
  const avatar = data?.[mergedKeys.avatar];
  const createdAt = data?.[mergedKeys.createdAt];
  const specialties = data?.[mergedKeys.specialties];

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit && !disabled) {
      onEdit(data);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete && !disabled) {
      onDelete(id);
    }
  };

  const handleCardClick = () => {
    if (onClick && !disabled) {
      onClick(data);
    }
  };

  return (
    <div
      className={`
        group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md 
        transition-all duration-300 border border-gray-100 hover:scale-105
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={handleCardClick}
    >
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {showAvatar && avatar && (
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold text-xl">
                  {avatar}
                </div>
              )}

              <h3
                className={`
                text-xl font-bold text-gray-900 mb-2 
                group-hover:text-blue-600 transition-colors
                ${titleClassName}
              `}
              >
                {title}
              </h3>

              {showStaffInfo && staff && (
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <StaffIcon className="w-4 h-4 mr-2" />
                  <span>{staff} Staff Members</span>
                </div>
              )}

              {showPrice && price && (
                <div
                  className={`flex items-center text-gray-600 text-sm mb-2 ${priceClassName}`}
                >
                  {PriceIcon && <PriceIcon className="w-4 h-4 mr-2" />}
                  <span>{price} JD</span>
                </div>
              )}

              {showEmail && email && (
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <EmailIcon className="w-4 h-4 mr-2" />
                  <span>{email}</span>
                </div>
              )}

              {showJoinDate && createdAt && (
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>Joined: {new Date(createdAt).getFullYear()}</span>
                </div>
              )}

              {showSpecialties && (
                <div className="mb-2">
                  <span className="text-gray-600 text-sm font-medium">
                    Specialties:
                  </span>
                  {specialties && specialties.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm ml-2">
                      No specialties available
                    </span>
                  )}
                </div>
              )}

              {showDescription && description && (
                <p className={`text-gray-500 text-sm ${descriptionClassName}`}>
                  {description}
                </p>
              )}
            </div>

            {(showEditIcon || showDeleteIcon) && (
              <div className="flex space-x-2 opacity-100 transition-opacity">
                {showEditIcon && EditIcon && (
                  <button
                    onClick={handleEdit}
                    disabled={disabled}
                    title={editTooltip}
                    className={`
                      p-2 text-blue-600 hover:bg-blue-50 rounded-lg 
                      transition-colors
                      ${disabled ? "cursor-not-allowed opacity-50" : ""}
                    `}
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                )}

                {showDeleteIcon && DeleteIcon && (
                  <button
                    onClick={handleDelete}
                    disabled={disabled}
                    title={deleteTooltip}
                    className={`
                      p-2 text-red-600 hover:bg-red-50 rounded-lg 
                      transition-colors
                      ${disabled ? "cursor-not-allowed opacity-50" : ""}
                    `}
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
