import Task from '../models/Task.js';

// Create a new Task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, isOutdoor } = req.body;
    

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      priority,
      isOutdoor,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all Tasks for the Logged-in User
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    // const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { title, description, priority, isOutdoor, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority !== undefined ? priority : task.priority;
    task.isOutdoor = isOutdoor !== undefined ? isOutdoor : task.isOutdoor;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
