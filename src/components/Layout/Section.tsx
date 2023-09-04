import SectionHeading from "../DataDisplay/SectionHeading";

const Section = (props: any) => {
  return (
    <>
      <SectionHeading
        heading={props.heading}
        sideText={props.sideText}
        subtitle={props.subtitle}
      />
      {props.children}
    </>
  );
};

export default Section;
