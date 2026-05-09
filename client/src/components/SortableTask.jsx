import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableTask({ task, children }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task._id });


    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
        zIndex: isDragging ? 10 : "auto"
    };

    return (
        <div 
            ref={setNodeRef}
            style={style}
            className="sortableTask"
            {...attributes}
            {...listeners}
        >
            {children}
        </div>
    )
}

export default SortableTask;