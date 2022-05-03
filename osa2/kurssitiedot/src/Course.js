const Course = ({course}) => {
    return(
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
        <Part key = {part.id} partName = {part.name} partExercises = {part.exercises}/>
      ))}
    </div>
  )
  const Part = ({partName, partExercises}) => (
    <p>{partName} {partExercises}</p>
  )
  const Total = ({total}) => (
    <p>Number of exercises {total}</p>
  )

export default Course