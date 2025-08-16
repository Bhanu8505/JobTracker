import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ data }) => {
  // console.log("Data in JobCard", data);

  const {
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
    setNodeRef,
  } = useDraggable({
    id: data._id,
  });

  const style = {
    transform: transform,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const handleClick = (e) => {
    if (!isDragging) {
      navigate(`/job/${data._id}`);
    }
  };

  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2 my-2 bg-gray-200 border-2 w-full shadow-lg h-fit p-2 rounded-lg cursor-pointer"
      onDoubleClick={handleClick}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className=" flex justify-center">
        <img src="/building1.png" className="w-10 h-15" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h3 className="flex justify-center">{data.title}</h3>
        <div className="flex gap-3 pl-3">
          <div className="w-7 h-7">
            <img src="/building2.png" />
          </div>
          <h4 className="flex justify-start pl-2">{data.company}</h4>
        </div>
        <div className="flex justify-end text-xs font-semibold w-full">
          <p>Last Updated-{new Date(data.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
