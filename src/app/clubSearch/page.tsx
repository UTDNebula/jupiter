import Header from '@src/components/BaseHeader';
import { ClubSearchComponent } from '@src/components/ClubSearchComponent';

type Params = {
  searchParams: { [key: string]: string | undefined };
};

const clubSearch = async (props: Params) => {
  const { searchParams } = props;
  const userSearch = searchParams['search'] || '';

  return (
    <main className="md:pl-72">
      <div>
        <Header />
        <ClubSearchComponent userSearch={userSearch} />
      </div>
    </main>
  );
};

export default clubSearch;
