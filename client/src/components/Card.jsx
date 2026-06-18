import React from 'react';

export const Card = ({ title, body, image, style = {} }) => {
  const bgClass = style.background || 'bg-white';
  const textColor = style.textColor || '#000';

  return (
    <div className={`rounded-lg shadow-md p-4 ${bgClass}`}>
      {image && <img src={image} alt="" className="w-full h-36 object-cover rounded-md mb-3" />}
      <h3 style={{ color: textColor }} className="font-bold">{title}</h3>
      <p style={{ color: textColor }} className="text-sm opacity-80">{body}</p>
    </div>
  );
};
