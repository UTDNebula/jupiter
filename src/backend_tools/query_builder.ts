import {
  collection,
  type DocumentData,
  type Firestore,
  getDocs,
  getFirestore,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import FirebaseApp from './firebase';

class QueryBuilder {
  query_constraints?: QueryConstraint[];
  queryPath?: string;
  db: Firestore = getFirestore(FirebaseApp);

  addConstraint(queryContraint: QueryConstraint): QueryBuilder {
    this.query_constraints?.push(queryContraint);
    return this;
  }

  async query(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    if (this.queryPath === undefined) {
      throw new Error('Query path needs to be defined');
    }
    if (this.query_constraints === undefined) {
      throw new Error('Create query contraints');
    }
    const q = query(
      collection(this.db, this.queryPath),
      ...this.query_constraints,
    );
    const docs = (await getDocs(q)).docs;
    return docs;
  }

  setPath(path: string): QueryBuilder {
    this.queryPath = path;
    return this;
  }
}

export default QueryBuilder;
