import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Carousel, CategoryCard } from '@/components/index';
import { BASE_URL } from '@/constants/api';

const Home = ({ categories }: {categories: Array<ICategory>}) => {
  return (
    <>
      <Head>
        <title>Pinkgreen.</title>
      </Head>
      <section>
        <h1>Categories.</h1>
        <Carousel settings={{ variableWidth: true }}>
          {categories.map(category => {
            return <CategoryCard key={category.id} name={category.name} id={category.id} image={category.image} />
          })}
        </Carousel>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<{categories: Array<ICategories>}>  = async () => {
  const res = await(await fetch(`${BASE_URL}/category`)).json();
  return { props: { categories: res } }
}

export default Home;
