/**
 * Utility functions để validate dữ liệu Task
 * Câu 2: Kiểm tra dữ liệu JSON và xử lý validation
 */

/**
 * Validate một task object
 * @param {Object} task - Object task cần validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateTask = (task) => {
  const errors = [];

  if (!task) {
    errors.push('Task không tồn tại');
    return { isValid: false, errors };
  }

  // Kiểm tra title
  if (!task.title || typeof task.title !== 'string') {
    errors.push('Title là bắt buộc và phải là chuỗi');
  } else if (task.title.trim().length === 0) {
    errors.push('Title không được để trống');
  } else if (task.title.trim().length < 3) {
    errors.push('Title phải có ít nhất 3 ký tự');
  } else if (task.title.length > 100) {
    errors.push('Title không được vượt quá 100 ký tự');
  }

  // Kiểm tra priority
  const validPriorities = ['High', 'Medium', 'Low'];
  if (!task.priority || !validPriorities.includes(task.priority)) {
    errors.push(`Priority phải là một trong: ${validPriorities.join(', ')}`);
  }

  // Kiểm tra status
  const validStatuses = ['To Do', 'In Progress', 'Done'];
  if (!task.status || !validStatuses.includes(task.status)) {
    errors.push(`Status phải là một trong: ${validStatuses.join(', ')}`);
  }

  // Kiểm tra id
  if (!task.id && task.id !== 0) {
    errors.push('Task phải có id');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate một mảng tasks
 * @param {Array} tasks - Mảng tasks cần validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateTaskList = (tasks) => {
  const errors = [];

  if (!Array.isArray(tasks)) {
    errors.push('Dữ liệu phải là một mảng');
    return { isValid: false, errors };
  }

  if (tasks.length === 0) {
    errors.push('Danh sách task không được để trống');
  }

  if (tasks.length < 5) {
    errors.push(`Danh sách phải có ít nhất 5 tasks (hiện có ${tasks.length})`);
  }

  // Validate từng task
  const taskErrors = [];
  tasks.forEach((task, index) => {
    const validation = validateTask(task);
    if (!validation.isValid) {
      taskErrors.push(`Task ${index + 1}: ${validation.errors.join('; ')}`);
    }
  });

  if (taskErrors.length > 0) {
    errors.push(...taskErrors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate form input
 * @param {string} title - Title input
 * @param {string} priority - Priority selected
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateFormInput = (title, priority) => {
  const trimmed = title.trim();

  // Kiểm tra title trống
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Vui lòng nhập tên task.',
    };
  }

  // Kiểm tra độ dài tối thiểu
  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: 'Tên task phải có ít nhất 3 ký tự.',
    };
  }

  // Kiểm tra độ dài tối đa (>100 ký tự)
  if (trimmed.length > 100) {
    return {
      isValid: false,
      error: `Tên task không được vượt quá 100 ký tự (hiện có: ${trimmed.length} ký tự).`,
    };
  }

  // Kiểm tra priority
  const validPriorities = ['High', 'Medium', 'Low'];
  if (!validPriorities.includes(priority)) {
    return {
      isValid: false,
      error: 'Priority không hợp lệ.',
    };
  }

  return {
    isValid: true,
    error: '',
  };
};

/**
 * Fetch và validate dữ liệu JSON từ file
 * @returns {Promise} Promise chứa { isValid, data, error }
 */
export const fetchAndValidateTaskData = async () => {
  try {
    const response = await fetch('/data.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Kiểm tra structure
    if (!data.tasks) {
      throw new Error('Dữ liệu JSON phải chứa property "tasks"');
    }

    // Validate danh sách tasks
    const validation = validateTaskList(data.tasks);

    if (!validation.isValid) {
      return {
        isValid: false,
        data: null,
        error: `Dữ liệu không hợp lệ:\n${validation.errors.join('\n')}`,
      };
    }

    return {
      isValid: true,
      data: data.tasks,
      error: null,
    };
  } catch (error) {
    return {
      isValid: false,
      data: null,
      error: `Lỗi khi tải dữ liệu: ${error.message}`,
    };
  }
};

export default {
  validateTask,
  validateTaskList,
  validateFormInput,
  fetchAndValidateTaskData,
};
