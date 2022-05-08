import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { MediumText } from "../../styles/TextStyles";

interface AboutMeCardRowProps {
  title: string;
  value: string | number;
  link : boolean;
}

const AboutMeCardRow = (props: AboutMeCardRowProps) => {

    const formatDate = (value: string | number): string => {
      if(typeof value === "number") {
        let date = new Date(value);
        return date.toLocaleDateString();
      } else {
        return value;
      }
  }

  if(props.link){
    return (
      <InfoDetailBox>
        <InfoKey>{props.title}:</InfoKey>
        <InfoValueWrapper>
            <LinkValue><a href={formatDate(props.value)}>{
            formatDate(props.value)
            }</a></LinkValue>
        </InfoValueWrapper>
      </InfoDetailBox>
    );

  }else{
    return (
      <InfoDetailBox>
        <InfoKey>{props.title}:</InfoKey>
        <InfoValueWrapper>
            <InfoValue>{formatDate(props.value)}</InfoValue>
        </InfoValueWrapper>
      </InfoDetailBox>
    );

  }


};

const InfoDetailBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 6px;
`;

const InfoValueWrapper = styled.div`
    
`;

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const InfoValue = styled(MediumText)`
  color: ${themes.light.text1};
  margin-bottom:8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LinkValue = styled(MediumText)`
  font-size:12px;
  margin-top:4px;
  > a { text-decoration: none; color: ${themes.light.linktext}; }

  @media (prefers-color-scheme: dark) {
    > a { text-decoration: none; color: ${themes.dark.linktext}; }
  }
`;

export default AboutMeCardRow
;
