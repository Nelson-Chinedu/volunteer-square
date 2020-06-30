import React, { FunctionComponent } from 'react';
import GridContainer from 'src/components/SharedLayout/Shared/GridContainer';
import CardContainer from 'src/components/SharedLayout/Shared/CardContainer';



const Events: FunctionComponent<{}> = () => {
  return (
    <div className="container mx-auto c-Events-container">
      <h2 className="text-4xl ml-6">Events</h2>
      <GridContainer gutter={[8, 48]}>
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </GridContainer>
      <GridContainer gutter={[8, 48]}>
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </GridContainer>
      <GridContainer gutter={[8, 48]}>
        <CardContainer />
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </GridContainer>
    </div>
  )
};

export default Events;
