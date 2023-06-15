import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLSchema,
} from "graphql";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const TodosType = new GraphQLObjectType({
  name: "Todos",
  fields: () => ({
    id: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    description: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    todos: {
      type: new GraphQLList(TodosType),
      async resolve(parent, args) {
        const todos = await prisma.todos.findMany();
        return todos;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodos: {
      type: TodosType,
      args: {
        completed: { type: GraphQLBoolean },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const newTodos = await prisma.todos.create({
          data: args,
        });
        return newTodos;
      },
    },
    updateTodos: {
      type: TodosType,
      args: {
        id: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        const updatedTodo = await prisma.todos.update({
          where: { id: args.id },
          data: {
            completed: args.completed,
          },
        });
        return updatedTodo;
      },
    },
    deleteTodos: {
      type: TodosType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const deleteTodo = await prisma.todos.delete({
          where: { id: args.id },
        });
        return deleteTodo;
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
});
