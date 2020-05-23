import os
import re
import time
import argparse
import subprocess


def get_args():
    parser = argparse.ArgumentParser(description="A file watcher that runs tests")
    parser.add_argument(
        "--tests",
        action="store",
        required=False,
        help="The path to the test file to run",
    )
    parser.add_argument(
        "--project",
        action="store",
        required=False,
        help="The folder where the project files are",
    )
    return parser.parse_args()


def watcher(project_path=None, test_path=None):
    if test_path and re.search("[a-z0-9]", test_path):
        test_path = "./" + test_path

    current_path = test_path or os.getcwd()

    if not project_path:
        project_path = os.path.dirname(current_path)

    print(f'Watching {test_path or "tests"} in {project_path}')

    # Run tests before starting watch
    cmd = ["pytest", current_path, "-v"]
    subprocess.call(cmd)

    f_dict = {}

    while True:
        files = os.listdir(project_path)
        for f in files:
            full_path = os.path.join(project_path, f)
            mod_time = os.stat(full_path).st_mtime
            if full_path not in f_dict:
                f_dict[full_path] = mod_time
            elif mod_time != f_dict[full_path]:
                # Run the tests
                cmd = ["pytest", current_path, "-v"]
                subprocess.call(cmd)
                # print('-' * 70)
                f_dict[full_path] = mod_time

        time.sleep(1)


def main():
    args = get_args()
    watcher(args.project, args.tests)


if __name__ == "__main__":
    main()
