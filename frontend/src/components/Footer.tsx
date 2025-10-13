const Footer = ({completedTaskCount = 0, activeTaskCount = 0}) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                🎉 Great job! You’ve completed {completedTaskCount} {completedTaskCount === 1 ? "task" : "tasks"}
                {activeTaskCount > 0 &&
                  `, still have ${activeTaskCount} ${activeTaskCount === 1 ? "task" : "tasks"} to go!`}
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>🚀 You have {activeTaskCount} {activeTaskCount === 1 ? "task" : "tasks"} to complete. Let's get started!</>
            )}
          </p>
        </div>
      )}
    </>
  );
}

export default Footer;