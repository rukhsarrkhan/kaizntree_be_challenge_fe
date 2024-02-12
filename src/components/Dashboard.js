import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

const TABLE_HEAD = ["SKU", "Name", "Tags", "Category", "In Stock", "Available Stock"];

export default function Dashboard() {
    const [data, setData] = useState();
    const access_token = sessionStorage.getItem('access_token');
    const [loginError, setLoginError] = useState('');
    const [paginationData, setPaginationData] = useState({
        count: 0,
        next: null,
        previous: null,
        currentPage: 1,
        totalPages: 1,
    });

    const getItems = (url = `http://127.0.0.1:8000/items/`) => {
        fetch(url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("data", data);
                setData(data);
                setPaginationData(prevState => ({
                    ...prevState,
                    count: data.count,
                    next: data.next,
                    previous: data.previous,
                    currentPage: new URL(url).searchParams.get('page') || 1,
                    totalPages: Math.ceil(data.count / 10),
                }));

            })
            .catch(error => {
                console.log('Fetch failed:', error.message);
                setLoginError('Fetch failed.');
            });

    };

    const itemsPerPage = 10; // Adjust this value based on your actual items per page
    const totalPages = Math.ceil(paginationData.count / itemsPerPage);
    const currentPage = paginationData.next ? parseInt(new URL(paginationData.next).searchParams.get('page'), 10) - 1 : totalPages;


    // Fetches data for the previous page
    const handlePreviousClick = () => {
        if (paginationData.previous) {
            getItems(paginationData.previous);
        }
    };

    // Fetches data for the next page
    const handleNextClick = () => {
        if (paginationData.next) {
            getItems(paginationData.next);
        }
    };

    // Fetch initial data
    useEffect(() => {
        getItems();
    }, []); // Dependency array left empty to ensure this effect runs only once on mount


    return (
        <div className="mt-24 p-4 bg-gray-100"> {/* This div wraps the Card component with padding */}

            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-1 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray" className="pl-3 font-bold text-xl">
                                Members list
                            </Typography>
                            <Typography color="gray" className="pl-3 mt-1 font-normal">
                                All Items
                            </Typography>
                        </div>
                        {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4 fill-black" />
                                <Typography color="gray" className="pl-3 mt-1 font-normal">
                                    Add Item
                                </Typography>
                            </Button>
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                        </div> */}
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 font-bold"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className=" leading-none opacity-70 font-bold"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.results.map(
                                ({ sku, name, tags, category, stock_status, available_stock, id }) => {
                                    const isLast = id === data?.count - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={sku}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {sku}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    {tags.map((tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="px-2 py-1 text-xs font-semibold text-blue-gray-800 bg-blue-gray-200 rounded-full"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <span className="px-2 py-1 text-sm font-semibold text-blue-gray-800 bg-blue-gray-200 rounded-full">
                                                        {category.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {stock_status}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {available_stock}
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    {/* Dynamically display current page and total page count */}
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        {/* Disable "Previous" button if there is no previous page */}
                        <Button variant="outlined" size="sm" disabled={!paginationData.previous} onClick={() => handlePreviousClick(paginationData.previous)}>
                            Previous
                        </Button>
                        {/* Disable "Next" button if there is no next page */}
                        <Button variant="outlined" size="sm" disabled={!paginationData.next} onClick={() => handleNextClick(paginationData.next)}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
