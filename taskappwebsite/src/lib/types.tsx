export type Status = {
    id: number;
    name: string;
};

export type Task = {
    isNew: boolean;
    id: number;
    title: string;
    description: string;
    createdDateTime: Date;
    dueDateTime: Date;
    status: Status | string;
};
