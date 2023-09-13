import React, { useEffect, useRef, useState } from "react";
import { TiWeatherNight } from "react-icons/ti";
import { WiDaySunny } from "react-icons/wi";
import { BsPlusSquareFill } from "react-icons/bs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { nanoid } from "nanoid";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Todo = ({ changeTheme, darkMode }) => {
  const [notifications, setNotifications] = useState([]);

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const notificationDiv = useRef();
  const onlyCompleted = useRef();
  const lenggthDiv = useRef();
  const onlyActive = useRef();
  const allBtn = useRef();
  const [] = useAutoAnimate();
  const allLiRef = useRef([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };
  function addTodoNotification(notificationText) {
    const newNotification = notificationText;
    setNotifications([...notifications, newNotification]);

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification !== newNotification
        )
      );
    }, 2500);
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = (e) => {
    e.preventDefault();
    if (e !== "") {
      setTodos((todos) => [
        ...todos,
        {
          id: nanoid(),
          title: todo.trim(),
          checked: false,
          completed: false,
          deleted: false,
        },
      ]);
    }

    addTodoNotification(`todo əlavə olundu :<b> ${todo}</b>`);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodoNotification(`todo silindi`);
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, checked: !todo.checked, completed: !todo.completed }
          : todo
      )
    );
  };

  const handleShowCompleted = () => {
    const list = Object.entries(allLiRef.current.children).map(
      ([index, child]) => {
        return child;
      }
    );

    list.forEach((cur) => {
      if (cur.classList.contains("completed")) {
        list.forEach((item) => {
          if (!item.classList.contains("completed")) {
            item.style.display = "none";
          }
        });
        list.forEach((item) => {
          if (item.classList.contains("completed")) {
            item.style.display = "flex";
          }
        });
      }
    });

    onlyCompleted.current.classList.add("active");
    allBtn.current.classList.remove("active");
    onlyActive.current.classList.remove("active");
  };
  const handleShowActive = () => {
    const list = Object.entries(allLiRef.current.children).map(
      ([index, child]) => {
        return child;
      }
    );

    list.forEach((cur) => {
      if (cur.classList.contains("completed")) {
        list.forEach((item) => {
          if (!item.classList.contains("completed")) {
            item.style.display = "flex";
          }
        });
        list.forEach((item) => {
          if (item.classList.contains("completed")) {
            item.style.display = "none";
          }
        });
      }
    });

    onlyCompleted.current.classList.remove("active");
    allBtn.current.classList.remove("active");
    onlyActive.current.classList.add("active");
  };

  const handleShowAll = () => {
    const list = Object.entries(allLiRef.current.children).map(
      ([index, child]) => {
        return child;
      }
    );
    list.forEach((cur) => {
      list.forEach((item) => {
        item.style.display = "flex";
      });
    });

    onlyCompleted.current.classList.remove("active");
    allBtn.current.classList.add("active");
    onlyActive.current.classList.remove("active");
  };

  const clearCompleted = () => {
    setTodos((todos) => todos.filter((todo) => !todo.completed));
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[500px] mt-[-230px] md:w-full md:px-[30px]">
          <div className="flex w-full items-center flex-col">
            <div className="flex items-center w-full justify-between mb-[20px]">
              <h3 className="uppercase tracking-[3px] text-[#fff] text-[30px] font-medium">
                todo
              </h3>
              <div onClick={changeTheme} className=" cursor-pointer">
                {darkMode ? (
                  <WiDaySunny className="text-[#fff] text-[20px] cursor-pointer" />
                ) : (
                  <TiWeatherNight className="text-[#fff] text-[25px] cursor-pointer" />
                )}
              </div>
            </div>
            <div id="form" className="w-full mb-[40px]">
              <form
                onSubmit={createTodo}
                disabled={!todo}
                className="w-full bg-[--bgColor] p-[5px] rounded-[5px] flex"
              >
                <input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  placeholder="todo əlavə et..."
                  className="w-full px-[10px] py-[12px] border-0 outline-0 text-[--text] shadow-0 bg-[--bgColor]"
                />
                <button disabled={!todo} className="text-[--text] ">
                  <BsPlusSquareFill className="text-[30px] cursor-pointer" />
                </button>
              </form>
            </div>

            <div className=" w-full bg-[--bgColor] rounded-[5px] shadow-mm h-[430px]  relative  ">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="h-[390px] w-full todoList  overflow-y-scroll"
                    >
                      <ul ref={allLiRef}>
                        {todos.map((elem, index) => (
                          <Draggable
                            key={elem.id}
                            draggableId={elem.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={`${
                                  elem.completed ? "completed" : ""
                                } `}
                              >
                                <TodoItem
                                  key={elem.id}
                                  chc={elem?.checked}
                                  itmCmpl={elem?.completed}
                                  tgl={toggleTodo}
                                  deleteTodo={deleteTodo}
                                  itemKey={elem?.id}
                                  name={elem?.title}
                                />
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {!todos?.length && (
                          <li className="text-center italic opacity-70 pt-[10px] text-[--text]">
                            Todo yoxdur
                          </li>
                        )}
                        {provided.placeholder}
                      </ul>
                    </div>
                  )}
                </Droppable>

                <ul className=" bg-[--bgColor] flex justify-between p-[10px]  w-full text-[--text] border-t-[1px] border-[--borderColor]">
                  <div ref={lenggthDiv} className="">
                    Items : {todos.length}
                  </div>
                  <div
                    className="actions flex justify-center items-center gap-[10px] capitalize md:absolute md:bottom-[-60px] 
                  md:left-0 md:right-0 md:bg-[--bgColor] md:border-[1px] md:border-[--borderColor]"
                  >
                    <p
                      ref={allBtn}
                      onClick={handleShowAll}
                      className="active cursor-pointer md:py-[10px] "
                    >
                      all
                    </p>
                    <p
                      ref={onlyActive}
                      onClick={handleShowActive}
                      className="cursor-pointer"
                    >
                      active
                    </p>
                    <p
                      ref={onlyCompleted}
                      onClick={handleShowCompleted}
                      className="cursor-pointer"
                    >
                      completed
                    </p>
                  </div>
                  <div>
                    <button onClick={clearCompleted} className="capitalize">
                      clear Completed
                    </button>
                  </div>
                </ul>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
      <div
        className="fixed bottom-[40px] right-[4%] transition-all  capitalize text-[#000] gap-[20px]"
        ref={notificationDiv}
      >
        {notifications.map((notification, index) => (
          <div
            className="bg-[#fff] mb-[10px] shadow-mm p-[10px]"
            key={index}
            dangerouslySetInnerHTML={{ __html: notification }}
          />
        ))}
      </div>
    </>
  );
};

export default Todo;
