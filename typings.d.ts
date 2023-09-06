type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface Vehicle extends Base {
  name: string,
  image: Image,
  infoList?: Array<List>,
  toDoList?: Array<List>,
  specList?: Array<List>,
  toBuyList?: Array<List>,
  ownedList?: Array<List>,
  description?: string,
}

interface List {
  label: string,
  item: string,
}