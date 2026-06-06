export type University = {
  id: number;
  name: string;
  country: string;
  website?: string;
  createdAt: string;
};

export let universities: University[] = [];
export let nextId = 1;
export function getNextId(): number {
  const id = nextId;
  nextId += 1;
  return id;
}
