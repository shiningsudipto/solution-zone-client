"use client";

import { useState } from "react";
import { tasks as initialTasks } from "@/data/tasks";
import { teamMembers } from "@/data/team";
import type { Task } from "@/types";
import {
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  ListTodo,
} from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ViewTaskModal } from "@/components/tasks/ViewTaskModal";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { TaskColumn } from "@/components/tasks/TaskColumn";
import { TaskStats } from "@/components/tasks/TaskStats";

const statusColumns = {
  todo: { label: "To Do", icon: ListTodo, color: "border-gray-500/20" },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "border-blue-500/20",
  },
  review: { label: "Review", icon: AlertCircle, color: "border-yellow-500/20" },
  done: { label: "Done", icon: CheckCircle2, color: "border-green-500/20" },
};

const priorityColors = {
  low: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  high: "bg-red-500/10 text-red-600 border-red-500/20",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Partial<Task>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  // Get tasks by status (sorted by order)
  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks
      .filter((task) => task.status === status)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  // Get team member name
  const getTeamMemberName = (id: string | null | undefined) => {
    if (!id) return "Unassigned";
    const member = teamMembers.find((m) => m.id === id);
    return member?.name || "Unknown";
  };

  const handleViewTask = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTask.id) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...editingTask } : t
        )
      );
      setIsEditModalOpen(false);
      setEditingTask({});
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active and over tasks
    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    // Check if we're hovering over a column
    const overColumn = overId as Task["status"];
    const isOverColumn = ["todo", "in-progress", "review", "done"].includes(
      overColumn
    );

    if (isOverColumn && activeTask.status !== overColumn) {
      // Update task status when dragging over a different column
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: overColumn } : task
        )
      );
    } else if (overTask && activeTask.status !== overTask.status) {
      // Update task status when dragging over a task in a different column
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === activeId ? { ...task, status: overTask.status } : task
        )
      );
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    // Find the active task
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if we're dropping on a column header
    const overColumn = overId as Task["status"];
    const isOverColumn = ["todo", "in-progress", "review", "done"].includes(
      overColumn
    );

    // Find the task we're dropping on (if any)
    const overTask = tasks.find((t) => t.id === overId);

    // Determine the target status
    const targetStatus = overTask ? overTask.status : isOverColumn ? overColumn : null;

    if (!targetStatus) return;

    // If moving within the same column
    if (activeTask.status === targetStatus && overTask) {
      const tasksInColumn = tasks
        .filter((t) => t.status === targetStatus)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const oldIndex = tasksInColumn.findIndex((t) => t.id === activeId);
      const newIndex = tasksInColumn.findIndex((t) => t.id === overId);

      if (oldIndex === newIndex) return;

      // Reorder the array
      const reordered = [...tasksInColumn];
      const [removed] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, removed);

      // Update all tasks in this column with new order
      const updatedTasks = tasks.map((task) => {
        if (task.status === targetStatus) {
          const newOrder = reordered.findIndex((t) => t.id === task.id);
          return {
            ...task,
            order: newOrder,
            updatedAt: task.id === activeId ? new Date().toISOString() : task.updatedAt,
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      return;
    }

    // Moving to a different column
    const sourceColumnTasks = tasks
      .filter((t) => t.status === activeTask.status && t.id !== activeId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const targetColumnTasks = tasks
      .filter((t) => t.status === targetStatus)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    // Calculate insertion position
    let insertPosition = 0;

    if (overTask && overTask.status === targetStatus) {
      // Insert before the task we're hovering over
      insertPosition = targetColumnTasks.findIndex((t) => t.id === overId);
      if (insertPosition === -1) insertPosition = targetColumnTasks.length;
    } else {
      // Dropping on column header - add to end
      insertPosition = targetColumnTasks.length;
    }

    // Create new arrays with proper ordering
    const newTargetColumnTasks = [...targetColumnTasks];
    newTargetColumnTasks.splice(insertPosition, 0, { ...activeTask, status: targetStatus });

    // Update all tasks with new orders
    const updatedTasks = tasks.map((task) => {
      // Update source column (excluding moved task)
      if (task.status === activeTask.status && task.id !== activeId) {
        const newOrder = sourceColumnTasks.findIndex((t) => t.id === task.id);
        return { ...task, order: newOrder };
      }

      // Update target column (including moved task)
      if (task.status === targetStatus) {
        const newOrder = newTargetColumnTasks.findIndex((t) => t.id === task.id);
        return { ...task, order: newOrder };
      }

      // This is the moved task
      if (task.id === activeId) {
        const newOrder = newTargetColumnTasks.findIndex((t) => t.id === task.id);
        return {
          ...task,
          status: targetStatus,
          order: newOrder,
          updatedAt: new Date().toISOString(),
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Calculate stats
  const statusCounts = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Tasks</h1>
            <p className="text-muted-foreground">
              Manage tasks with Kanban board view
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {/* Stats */}
        <TaskStats statusCounts={statusCounts} statusColumns={statusColumns} />

        {/* Search */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(statusColumns) as Array<keyof typeof statusColumns>).map(
            (status) => (
              <TaskColumn
                key={status}
                id={status}
                label={statusColumns[status].label}
                icon={statusColumns[status].icon}
                tasks={getTasksByStatus(status)}
                activeId={activeId}
                activeTaskStatus={activeTask?.status || null}
                onView={handleViewTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                getTeamMemberName={getTeamMemberName}
              />
            )
          )}
        </div>

        {/* View Modal */}
        <ViewTaskModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          task={selectedTask}
          getTeamMemberName={getTeamMemberName}
        />

        {/* Edit Modal */}
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          task={editingTask}
          onTaskChange={setEditingTask}
          onSave={handleSaveEdit}
        />
      </div>

      {/* Drag Overlay - Ghost image while dragging */}
      <DragOverlay>
        {activeTask ? (
          <div className="bg-background border-2 border-primary rounded-xl p-4 shadow-2xl opacity-90 rotate-3 scale-105">
            <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
              {activeTask.title}
            </h4>
            {activeTask.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {activeTask.description}
              </p>
            )}
            <div className="mb-3">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                  priorityColors[activeTask.priority]
                }`}
              >
                {priorityLabels[activeTask.priority]}
              </span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
