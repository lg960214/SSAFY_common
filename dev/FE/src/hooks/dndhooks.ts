import { useDrag } from 'react-dnd';

export const useDraggable = (type: string, id: string) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: type,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, drag, preview };
};

export default useDraggable;
