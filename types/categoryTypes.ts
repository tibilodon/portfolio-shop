export type DBCategory = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  parentId: number | null;
};
export type BuildHierarchyType = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  parentId: number | null;
  children?: [BuildHierarchyType | []];
}[];
("{ id: number; createdAt: Date; updatedAt: Date | null; name: string; parentId: number | null; children: [BuildHierarchyType] | []; }");
