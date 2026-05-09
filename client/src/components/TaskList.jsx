import {
    DndContext,
    closestCenter
} from "@dnd-kit/core";

import {
    SortableContext,
    rectSortingStrategy
} from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import SkeletonLoader from "./SkeletonLoader";
import SortableTask from "./SortableTask";

function TaskList({
    loading,
    filteredTasks,
    sensors,
    handleDragEnd,
    deleteTask,
    toggleComplete,
    updateTask
}) {
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={filteredTasks.map(task => task._id)}
                strategy={rectSortingStrategy}
            >
                <div className="taskList">
                    {loading ? (
                        <SkeletonLoader />
                    ) : filteredTasks.length === 0 ? (
                        <p className="empty">No Task yet. Add one.</p>
                    ) : (
                        filteredTasks.map(task => (
                            <SortableTask key={task._id} task={task}>
                                <TaskCard
                                    task={task}
                                    deleteTask={deleteTask}
                                    toggleComplete={toggleComplete}
                                    updateTask={updateTask}
                                />
                            </SortableTask>
                        ))
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
}

export default TaskList;