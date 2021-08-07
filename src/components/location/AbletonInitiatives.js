const AbletonInitiatives = ({ initiatives, year }) => {
  const filteredInitiatives = initiatives.filter(initiative => {
    return initiative.outputs.some(({ milestones }) => {
      return milestones.some(milestone => {
        const [milestoneYear] = milestone.date.split('-');
        return milestoneYear === year;
      });
    });
  });

  return (
    <>
      {filteredInitiatives.map(initiative => {
        return (
          <div className="bg-white mb-3">
            <div className="p-2 bg-gray-200 font-semibold text-lg">Initiative: {initiative.name}</div>

            <div className="p-3">
              <span className="font-semibold pb-2">Outputs</span>
              {initiative.outputs
                .filter(({ milestones }) => {
                  return milestones.some(milestone => {
                    const [milestoneYear] = milestone.date.split('-');
                    return milestoneYear === year;
                  });
                })
                .map(output => {
                  return (
                    <div className="p-2 rounded-sm mb-2">
                      <span className="font-semibold">{output.name}</span>

                      <ul className="pl-3">
                        {output.milestones
                          .filter(({ date }) => {
                            const [milestoneYear] = date.split('-');
                            return milestoneYear === year;
                          })
                          .map(({ name }) => (
                            <li>{name}</li>
                          ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AbletonInitiatives;
