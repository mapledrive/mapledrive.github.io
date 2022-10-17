import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from 'features/news/newsSlice';
import {
  StyledSection,
  SectionTitle,
  SectionContent,
  NewsWrapper,
} from 'style';
import Spinner from 'components/Spinner';

const Newspage = () => {
  const list = useSelector(state => state.news.list);
  const isLoading = useSelector(state => state.news.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews()); // Safe to add dispatch to the dependencies array
  }, [dispatch]);

  return (
    <StyledSection>
      {isLoading && <Spinner />}
      <NewsWrapper isLoading={isLoading}>
        <SectionContent>
          {list[0]?.date ? list[0]?.date : '16 Oct 2022'}
        </SectionContent>
        <SectionTitle>
          {list[0]?.title ? list[0]?.title : 'Panasonic India announce'}
        </SectionTitle>
        <SectionContent>
          {list[0]?.content
            ? list[0]?.content
            : 'Panasonic India announced a new range of Smart Washing Machines powered by Panasonics IoT platform Miraie, starting at ₹19,690. The wi-fi-enabled top-load washing machines are controllable via Miraie, Alexa and/or Google Assistant. They are equipped with Built-In Heater, Wash Wizard for custom recommendations and Stain Genius which gives consumers pre-treatment recommendations based on stains.'}
        </SectionContent>
        <img src={list[0]?.imageUrl} alt='news' />
        <SectionContent>
          {list[0]?.readMoreUrl && (
            <a href={list[0]?.readMoreUrl} target='_blank' rel='noreferrer'>
              read more...
            </a>
          )}
        </SectionContent>
      </NewsWrapper>
      <NewsWrapper isLoading={isLoading}>
        <SectionContent>
          {list[1]?.date ? list[1]?.date : '16 Oct 2022'}
        </SectionContent>
        <SectionTitle>
          {list[1]?.title ? list[1]?.title : 'Panasonic India announce'}
        </SectionTitle>
        <SectionContent>
          {list[1]?.content
            ? list[1]?.content
            : 'Panasonic India announced a new range of Smart Washing Machines powered by Panasonics IoT platform Miraie, starting at ₹19,690. The wi-fi-enabled top-load washing machines are controllable via Miraie, Alexa and/or Google Assistant. They are equipped with Built-In Heater, Wash Wizard for custom recommendations and Stain Genius which gives consumers pre-treatment recommendations based on stains.'}
        </SectionContent>
        <img src={list[1]?.imageUrl} alt='news' />
        <SectionContent>
          {list[1]?.readMoreUrl && (
            <a href={list[1]?.readMoreUrl} target='_blank' rel='noreferrer'>
              read more...
            </a>
          )}
        </SectionContent>
      </NewsWrapper>
      <NewsWrapper isLoading={isLoading}>
        <SectionContent>
          {list[2]?.date ? list[2]?.date : '16 Oct 2022'}
        </SectionContent>
        <SectionTitle>
          {list[2]?.title ? list[2]?.title : 'Panasonic India announce'}
        </SectionTitle>
        <SectionContent>
          {list[2]?.content
            ? list[2]?.content
            : 'Panasonic India announced a new range of Smart Washing Machines powered by Panasonics IoT platform Miraie, starting at ₹19,690. The wi-fi-enabled top-load washing machines are controllable via Miraie, Alexa and/or Google Assistant. They are equipped with Built-In Heater, Wash Wizard for custom recommendations and Stain Genius which gives consumers pre-treatment recommendations based on stains.'}
        </SectionContent>
        <img src={list[2]?.imageUrl} alt='news' />
        <SectionContent>
          {list[2]?.readMoreUrl && (
            <a href={list[2]?.readMoreUrl} target='_blank' rel='noreferrer'>
              read more...
            </a>
          )}
        </SectionContent>
      </NewsWrapper>
      <NewsWrapper isLoading={isLoading}>
        <SectionContent>
          {list[3]?.date ? list[3]?.date : '16 Oct 2022'}
        </SectionContent>
        <SectionTitle>
          {list[3]?.title ? list[3]?.title : 'Panasonic India announce'}
        </SectionTitle>
        <SectionContent>
          {list[3]?.content
            ? list[3]?.content
            : 'Panasonic India announced a new range of Smart Washing Machines powered by Panasonics IoT platform Miraie, starting at ₹19,690. The wi-fi-enabled top-load washing machines are controllable via Miraie, Alexa and/or Google Assistant. They are equipped with Built-In Heater, Wash Wizard for custom recommendations and Stain Genius which gives consumers pre-treatment recommendations based on stains.'}
        </SectionContent>
        <img src={list[3]?.imageUrl} alt='news' />
        <SectionContent>
          {list[3]?.readMoreUrl && (
            <a href={list[3]?.readMoreUrl} target='_blank' rel='noreferrer'>
              read more...
            </a>
          )}
        </SectionContent>
      </NewsWrapper>
      <NewsWrapper isLoading={isLoading}>
        <SectionContent>
          {list[4]?.date ? list[4]?.date : '16 Oct 2022'}
        </SectionContent>
        <SectionTitle>
          {list[4]?.title ? list[4]?.title : 'Panasonic India announce'}
        </SectionTitle>
        <SectionContent>
          {list[4]?.content
            ? list[4]?.content
            : 'Panasonic India announced a new range of Smart Washing Machines powered by Panasonics IoT platform Miraie, starting at ₹19,690. The wi-fi-enabled top-load washing machines are controllable via Miraie, Alexa and/or Google Assistant. They are equipped with Built-In Heater, Wash Wizard for custom recommendations and Stain Genius which gives consumers pre-treatment recommendations based on stains.'}
        </SectionContent>
        <img src={list[4]?.imageUrl} alt='news' />
        <SectionContent>
          {list[4]?.readMoreUrl && (
            <a href={list[4]?.readMoreUrl} target='_blank' rel='noreferrer'>
              read more...
            </a>
          )}
        </SectionContent>
      </NewsWrapper>
    </StyledSection>
  );
};

export { Newspage };
