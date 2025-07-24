import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkeleton } from 'features/skeleton/skeletonSlice';

const SkeletonComponent = () => {
  const isLoading = useSelector(state => state.skeleton.isLoading);
  const products = useSelector(state => state.skeleton.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSkeleton());
  }, [dispatch]);

  return (
    <Row>
      {isLoading
        ? [1, 2, 3, 4, 5, 6].map(loading => (
            <ColThree key={loading}>
              <SkeletonProduct />
            </ColThree>
          ))
        : products.map(product => (
            <ColThree key={product.id}>
              <Product>
                <ProductImage>
                  <img src={product.image} alt='' />
                </ProductImage>
                <ProductBody>
                  <ProductTitle>{product.title.slice(0, 30)}</ProductTitle>
                  <ProductPrice>$ {product.price}</ProductPrice>
                  <ProductButton>
                    <a href='www.youtube.com'>buy now</a>
                  </ProductButton>
                </ProductBody>
              </Product>
            </ColThree>
          ))}
    </Row>
  );
};

export { SkeletonComponent };

const SkeletonProduct = () => {
  return (
    <SkeletonWrapper>
      <Skeleton1 />
      <Skeleton2 />
      <Skeleton3 />
      <Skeleton4 />
      <ShimmerWrapper>
        <Shimmer />
      </ShimmerWrapper>
    </SkeletonWrapper>
  );
};

const Skeleton1 = () => {
  return (
    <StyledSkeleton>
      <Thumbnail> </Thumbnail>
    </StyledSkeleton>
  );
};

const Skeleton2 = () => {
  return (
    <StyledSkeleton>
      <Textlg> </Textlg>
    </StyledSkeleton>
  );
};

const Skeleton3 = () => {
  return (
    <StyledSkeleton>
      <Textmd> </Textmd>
    </StyledSkeleton>
  );
};

const Skeleton4 = () => {
  return (
    <StyledSkeleton>
      <Textsm> </Textsm>
    </StyledSkeleton>
  );
};

const loader = keyframes`
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translateX(150%);
    }
  `;

const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  opacity: 0.2;
  background: rgba(238, 238, 238, 0.966);
  transform: skewX(-20deg);
  animation: ${loader} 1s linear infinite;
`;

const ShimmerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledSkeleton = styled.div`
  margin: 10px 0;
`;

const Thumbnail = styled.div`
  margin: 10px 0;
  width: 100%;
  min-height: 200px;
  background: #d2dbe2;
  border-radius: 7px;
`;

const Textlg = styled.div`
  margin: 10px 0;
  width: 100%;
  margin-top: 10px;
  background: #d2dbe2;
  border-radius: 7px;
  min-height: 10px;
`;

const Textmd = styled.div`
  margin: 10px 0;
  width: 70%;
  margin-top: 10px;
  background: #d2dbe2;
  border-radius: 7px;
  min-height: 10px;
`;

const Textsm = styled.div`
  margin: 10px 0;
  width: 40%;
  margin-top: 10px;
  background: #d2dbe2;
  border-radius: 7px;
  min-height: 10px;
`;

const ColThree = styled.div`
  width: 25%;
  padding: 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
`;

const Product = styled.div`
  width: 100%;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductBody = styled.div`
  margin: 8px 0;
`;

const ProductTitle = styled.div`
  font-size: 16px;
`;

const ProductPrice = styled.div`
  font-size: 16px;
  margin-top: 6px;
  font-weight: bold;
`;

const ProductButton = styled.div`
  margin: 4px;
  a {
    text-decoration: none;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    padding: 0px 15px;
    background: black;
    color: white;
    border-radius: 4px;
    outline: none;
    text-transform: capitalize;
  }
`;
