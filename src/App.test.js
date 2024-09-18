import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import CourseDetails from '../src/components/Courses/CourseDetails'; // Import the component
import VideoPlayer from '../src/components/Courses/VideoPlayer'; // Import the component

// Existing App component test
test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  //screen.debug(); 
  
//const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});

// New test for CourseDetails component
test('renders CourseDetails component', () => {
  render(<CourseDetails />);
  // Add specific assertions for CourseDetails
});

// New test for VideoPlayer component
test('renders VideoPlayer component', () => {
  render(<VideoPlayer />);
  // Add specific assertions for VideoPlayer
});
