const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.reduce((a, b) => (a + b.exercises), 0)}/>
    </div>
  )
}

const Header = ({course}) => (
  <h1>{course}</h1>
)
const Content = ({parts}) => (
  <div>
    {parts.map(part => (
      <Part partName = {part.name} partExercises = {part.exercises}/>
    ))}
  </div>
)
const Part = ({partName, partExercises}) => (
  <p>{partName} {partExercises}</p>
)
const Total = ({total}) => (
  <p>Number of exercises {total}</p>
)
export default App
