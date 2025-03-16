import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Animated,
  Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Task Item Component - demonstrates props passing
const TaskItem = ({ item, onComplete, onDelete }) => {
  return (
    <Animated.View style={[
      styles.taskContainer,
      { 
        opacity: item.opacity,
        transform: [{ scale: item.scale }]
      }
    ]}>
      <TouchableOpacity 
        style={[styles.task, item.completed && styles.taskCompleted]} 
        onPress={() => onComplete(item.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox, 
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        
        <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => onDelete(item.id)}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Header Component - demonstrates simple props
const Header = ({ taskCount }) => (
  <View style={styles.header}>
    <Text style={styles.sectionTitle}>Task Manager</Text>
    <Text style={styles.taskCount}>
      {taskCount} remaining
    </Text>
  </View>
);

// Input Form Component - demonstrates state lifting and props
const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  
  const handleSubmit = () => {
    if (taskText.trim().length > 0) {
      onAddTask(taskText);
      setTaskText('');
    } else {
      Alert.alert("Empty Task", "Please enter a task description");
    }
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput 
        style={styles.input} 
        placeholder={'Add a new task...'}
        placeholderTextColor="#A0A0A0"
        value={taskText}
        onChangeText={setTaskText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      
      <TouchableOpacity 
        onPress={handleSubmit}
        style={styles.addWrapper}
        activeOpacity={0.7}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

// Main App Component - manages the primary state
export default function App() {
  // Main state for task list
  const [taskItems, setTaskItems] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(1));
  
  // Add a new task with animation
  const handleAddTask = (text) => {
    // Create new task with animation value
    const newTask = { 
      id: Date.now().toString(), 
      text: text, 
      completed: false,
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.8)
    };
    
    // Update state with new task
    setTaskItems([...taskItems, newTask]);
    
    // Animate the new task appearing
    Animated.parallel([
      Animated.timing(newTask.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.spring(newTask.scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
  };
  
  // Toggle task completion status with animation
  const completeTask = (id) => {
    setTaskItems(
      taskItems.map(item => {
        if (item.id === id) {
          // Animate completion status change
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0.5,
              duration: 200,
              useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true
            })
          ]).start();
          
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };
  
  // Delete a task with confirmation
  const deleteTask = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            // Animate the task being removed
            const taskToDelete = taskItems.find(item => item.id === id);
            
            Animated.timing(taskToDelete.opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true
            }).start(() => {
              // Remove from state after animation completes
              setTaskItems(taskItems.filter(item => item.id !== id));
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  // Count incomplete tasks for the header
  const incompleteTaskCount = taskItems.filter(task => !task.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Pass the count as props to Header */}
      <Header taskCount={incompleteTaskCount} />
      
      <FlatList
        data={taskItems}
        renderItem={({ item }) => (
          // Pass item data and handlers as props to TaskItem
          <TaskItem 
            item={item} 
            onComplete={completeTask} 
            onDelete={deleteTask} 
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyList}>No tasks yet. Add one below!</Text>
          </View>
        }
      />
      
      {/* Pass add task handler as props to TaskInput */}
      <TaskInput onAddTask={handleAddTask} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  taskCount: {
    fontSize: 16,
    color: '#666666',
  },
  taskList: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  task: {
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskCompleted: {
    backgroundColor: '#F9F9F9',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#A0A0A0',
  },
  deleteButton: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyList: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 16,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width: '80%',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#4CAF50',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  addText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 